import userService from "../services/userService";
let register = async (req, res) => {
  try {
    let { phone, password } = req.body;
    let token = await userService.createUser(phone, password);
    return res.status(200).send(token);
  } catch (error) {
    return res.status(500).send(error);
  }
};
let login = async (req, res) => {
  try {
    let { phone, password } = req.body;
    let token = await userService.findUser(phone, password);
    return res.status(200).send(token);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default {
  register: register,
  login: login,
};
