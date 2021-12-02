//import { MISSING_BODY_VALUES } from "../../config/errorStrings"
//import { Flix } from "../../services/flix"
//import { isNumber } from 'lodash'
import { failedBody, successfulBody } from "../../tools/routingTools";
//import { toObjectId } from "../../tools/string"
//import Bookmark from "../../models/course/bookmark"
//import Lecturer from "../../models/course/lecturer"*/

export default function courseRoutes(app: any) {
  test(app, "/test");
  test(app, "/test1");
}

const test = (app: any, route: string) => {
  app.get(route, async (req: any, res: any) => {
    res.send(successfulBody());
  });
};
