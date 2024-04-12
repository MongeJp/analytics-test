import { v4 as uuidv4 } from "uuid";

const METRIC = "facebook";
const url = process.env.TRACKING_LAMBDA_URL;

export const setupTrackingId = () => {
  const trackingId = localStorage.getItem("trackingId");
  if (!trackingId) localStorage.setItem("trackingId", uuidv4());

  return trackingId;
};

export const getTrackingId = () => {
  return localStorage.getItem("trackingId") || setTrackingId();
};

const getCurrentDateInUTC = () => {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const trackEvent = (eventName, params) => {
  const trackingId = getTrackingId();
  const event = {
    event: eventName,
    tracking_id: trackingId,
    event_timestamp: getCurrentDateInUTC(),
    metric: METRIC,
  };

  const PRESET_KEYS = ["event", "tracking_id", "event_timestamp", "metric"];

  for (const key in params) {
    if (!PRESET_KEYS.includes(key)) {
      event[key] = params[key];
    }
  }

  const eventValue = JSON.stringify(event);

  navigator.sendBeacon(url, eventValue);
};
