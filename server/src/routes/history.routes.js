import {Router} from "express";
import * as historyController from "../controllers/history.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";


const historyRouter = Router();

historyRouter.use(authMiddleware); // Apply authentication middleware to all routes



historyRouter.get("/user-history", historyController.getUserHistory);
historyRouter.get("/history-entry/:entryId", historyController.getHistoryEntryById);
historyRouter.delete("/delete-entry/:entryId", historyController.deleteHistoryEntry);
historyRouter.delete("/clear-history", historyController.clearUserHistory);






export default historyRouter;