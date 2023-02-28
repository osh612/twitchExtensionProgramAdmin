export default {
  getDiffFromPastToNow(pastTime: string | number | Date) {
    const start = new Date(pastTime);
    const now = new Date();
    return (now.getTime() - start.getTime()) / 1000;
  },
};
