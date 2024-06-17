import { Router } from "express"
import { validateRequest } from "../../middlewares/validateRequest";
import { RoomValidations } from "./Room.validation";
import { RoomController } from "./Room.controller";
import auth from "../../middlewares/auth";


const router = Router();

router.post("/",auth("admin"), validateRequest(RoomValidations.createRoomSchemaValidations), RoomController.createRoom);
router.get("/", RoomController.getAllRoom);
router.get("/:id", RoomController.getSingleRoom);

export const RoomRoutes = router;