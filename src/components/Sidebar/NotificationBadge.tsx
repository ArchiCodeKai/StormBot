import React from 'react';

type Props = { count: number };
const NotificationBadge: React.FC<Props> = ({ count }) =>
  count > 0 ? (
    <span className="tag is-danger is-rounded" style={{ position: 'absolute', top: 2, right: 8, fontSize: 10 }}>
      {count}
    </span>
  ) : null;

export default NotificationBadge;
