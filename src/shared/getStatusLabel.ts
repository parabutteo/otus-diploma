export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'PendingConfirmation':
      return 'ожидает подтверждения';
    case 'OrderCancelled':
      return 'отменён';
    case 'Processing':
      return 'подтверждён';
    default:
      return status;
  }
};
