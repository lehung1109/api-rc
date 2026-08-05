import type { FieldsOfActivityScrollRevealModel } from "@/components/fields-of-activity/FieldsOfActivityScrollReveal";
import fieldsOfActivity from "./fields-of-activity";

const fieldsOfActivityScrollReveal: FieldsOfActivityScrollRevealModel = {
  targetId: fieldsOfActivity.scrollReveal?.targetId ?? "fields-of-activity",
};

export default fieldsOfActivityScrollReveal;
