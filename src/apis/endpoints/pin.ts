import service from "../axios";

export const checkPinApi = (pin: string): Promise<{token: string}> => {
  return service.post("check-pin", { pin }).then((res) => res.data);
};
