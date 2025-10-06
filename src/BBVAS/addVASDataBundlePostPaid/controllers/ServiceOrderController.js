import { createExtraGBPrepaidOrder, createVASDataBundleOrder, createLoyaltyUpgradeOrder } from "../services/ServiceOrderService.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const purchaseExtraGBPrepaidInit = async (req, res) => {
  try {
    const result = await createExtraGBPrepaidOrder(req.body);
    return successResponse(res, result, 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

export const purchaseVASPostpaidInit = async (req, res) => {
  try {
    const result = await createVASDataBundleOrder(req.body);
    return successResponse(res, result, 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

export const upgradeLoyaltyInit = async (req, res) => {
  try {
    const result = await createLoyaltyUpgradeOrder(req.body);
    return successResponse(res, result, 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};
