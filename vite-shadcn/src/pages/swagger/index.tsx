import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import spec from "./swagger.json";
export default function Swagger() {
  return <SwaggerUI spec={spec} />
}
