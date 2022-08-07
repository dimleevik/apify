import axios from "axios";
import { envs } from "./app/constants/environments";
import { main } from "./app/main";
import { ApiCommerceAdapter } from "./app/service/ApiCommerceAdapter";

const adapter = new ApiCommerceAdapter(
  axios.create({
    baseURL: envs.BASE_URL,
    timeout: 1000,
  })
);

main(adapter);
