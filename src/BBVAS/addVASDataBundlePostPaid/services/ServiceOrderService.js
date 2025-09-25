const USE_MOCK = true; // Toggle to false when connecting to real SLT API

/**
 * Create a Service Order for VAS data bundle (postpaid)
 */
  // export const createVASDataBundleOrder = async (body) => {
  //   const subscriber = body.relatedParty?.find(p => p.role === 'subscriber');
  //   const orderItem = body.orderItem?.[0];

  //   if (!subscriber?.id) throw new Error("Missing subscriber ID");
  //   if (!orderItem?.productOffering?.id) throw new Error("Missing productOffering ID");

  //   // Mock processing logic
  //   const approved = USE_MOCK ? true : false; // replace with actual SLT API call

  //   return {
  //     id: `SO-${Date.now()}`,
  //     state: approved ? "approved" : "rejected",
  //     requestedBy: body.requestedBy || "system",
  //     channel: body.channel || "WEB",
  //     orderItem: [
  //       {
  //         id: orderItem.id || "1",
  //         productOffering: orderItem.productOffering,
  //         action: orderItem.action || "add",
  //         state: approved ? "completed" : "failed"
  //       }
  //     ]
  //   };
  // };
  
import { v4 as uuidv4 } from 'uuid';
export const createVASDataBundleOrder = async (body) => {
  const subscriber = body.relatedParty?.find(p => p.role === "subscriber");
  const orderItem = body.orderItem?.[0];

  if (!subscriber?.id) throw new Error("Missing subscriber ID");
  if (!orderItem?.productOffering?.id) throw new Error("Missing productOffering ID");

  const approved = USE_MOCK ? true : false;

  return {
    id: `SO-${uuidv4()}`,
    state: approved ? "acknowledged" : "rejected",
    requestedBy: body.requestedBy || "system",
    channel: body.channel || "WEB",
    orderDate: new Date().toISOString(),
    orderItem: [
      {
        id: orderItem.id || "1",
        productOffering: orderItem.productOffering,
        action: orderItem.action || "add",
        state: approved ? "completed" : "failed",
        note: orderItem.note || ""
      }
    ]
  };
};


/**
 * Create a Service Order for Extra GB Prepaid
 */
export const createExtraGBPrepaidOrder = async (body) => {
  const subscriber = body.relatedParty?.find(p => p.role === 'subscriber');
  const orderItem = body.orderItem?.[0];

  if (!subscriber?.id) throw new Error("Missing subscriber ID");
  if (!orderItem?.productOffering?.id) throw new Error("Missing productOffering ID");

  const approved = USE_MOCK ? true : false; // replace with real SLT API call

  return {
    id: `SO-${Date.now()}`,
    state: approved ? "approved" : "rejected",
    requestedBy: body.requestedBy || "system",
    channel: body.channel || "WEB",
    orderItem: [
      {
        id: orderItem.id || "1",
        productOffering: orderItem.productOffering,
        action: orderItem.action || "add",
        state: approved ? "completed" : "failed",
        note: orderItem.note || ""
      }
    ]
  };
};


/**
 * Create Loyalty Upgrade ServiceOrder
 */
export const createLoyaltyUpgradeOrder = async (body) => {
  const subscriber = body.relatedParty?.find(p => p.role === "subscriber");
  const orderItem = body.orderItem?.[0];

  if (!subscriber?.id) throw new Error("Missing subscriber ID");
  if (!orderItem?.productOffering?.id) throw new Error("Missing productOffering ID");

  // Mock processing logic
  const approved = USE_MOCK ? true : false; // replace with actual SLT API call


  return {
    id: `SO-${Date.now()}`,
    state: approved ? "approved" : "rejected",
    requestedBy: body.requestedBy || "system",
    channel: body.channel || "WEB",
    orderItem: [
      {
        id: orderItem.id || "1",
        productOffering: orderItem.productOffering,
        action: orderItem.action || "update",
        state: approved ? "completed" : "failed",
        note: orderItem.note || ""
      }
    ]
  };
};
