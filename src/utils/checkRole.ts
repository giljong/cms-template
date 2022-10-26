export const checkRole = (roles: string[], check: string[]) => {
  return [...check, 'MASTER'].some((v) => roles.includes(v));
};
