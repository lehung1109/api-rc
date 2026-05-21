
import express, { type Request, type Response } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

// Import các React component cần SSR
import Header from '@components/header/Header';

const app = express();
app.disable('x-powered-by');

// Parse JSON body
app.use(express.json({ limit: '1mb' }));

// Map tên component -> component thật
const COMPONENT_MAP = {
  Header,
};

app.post('/api/get-html-rc', (req: Request, res: Response) => {
  try {
    const { rcName, rcProps } = req.body || {};

    if (!rcName || typeof rcName !== 'string') {
      return res.status(400).json({
        ok: false,
        message: 'rcName is required and must be a string',
      });
    }

    if (rcProps != null && typeof rcProps !== 'object') {
      return res.status(400).json({
        ok: false,
        message: 'rcProps must be an object',
      });
    }

    const Component = COMPONENT_MAP[rcName as keyof typeof COMPONENT_MAP];

    if (!Component) {
      return res.status(400).json({
        ok: false,
        message: `Unsupported rcName: ${rcName}`,
      });
    }

    const reactNode = React.createElement(Component, rcProps || {});
    const html = renderToString(reactNode);

    return res.status(200).json({
      ok: true,
      html,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
});

// Nếu ai gọi đúng path nhưng sai method
app.all('/api/get-html-rc', (req, res) => {
  res.status(405).json({
    ok: false,
    message: 'Method not allowed',
  });
});

// Chặn mọi route khác
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: 'Not found',
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});