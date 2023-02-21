import { confirmAlert } from 'react-confirm-alert';

export const confirmDelete = (
  id,
  confirmHandler,
  blogId = '',
  title = 'Blog'
) => {
  confirmAlert({
    title: `Delete ${title} `,
    message: 'Are you sure to do this.',
    buttons: [
      {
        label: 'Delete',
        onClick: () => confirmHandler(id, blogId),
      },
      {
        label: 'Cancel',
        // onClick: () => alert('Click No'),
      },
    ],
  });
};
