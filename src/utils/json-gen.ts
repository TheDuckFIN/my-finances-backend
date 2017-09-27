/*
 * JSON templates for responses
 */

export const success = (data?: object) => ({
  ok: true,
  data
});

export const failure = (error?: string | object) => ({
  ok : false,
  error
});