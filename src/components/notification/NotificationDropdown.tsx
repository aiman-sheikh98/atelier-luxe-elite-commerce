import React from 'react';
import { BellDot, Bell, Check, X, AlertCircle, ShoppingBag, Megaphone } from 'lucide-react';
import { useNotifications, NotificationType } from '@/context/NotificationContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// Helper to format dates in real-time
const formatRelativeTime = (date: Date) => {
  return 'Just now'; // Always show "Just now" for real-time notifications
};

const NotificationItem: React.FC<{ notification: NotificationType; onRead: () => void }> = ({ 
  notification, 
  onRead 
}) => {
  const { type, title, description, date, read } = notification;
  
  // Different styles based on notification type
  const getBgColor = () => {
    if (read) return 'bg-background hover:bg-muted';
    return 'bg-muted/40 hover:bg-muted';
  };
  
  const getTypeColor = () => {
    switch (type) {
      case 'order': return 'text-green-600';
      case 'cancelled': return 'text-red-600';
      case 'promotion': return 'text-luxury';
      default: return 'text-blue-600';
    }
  };
  
  // Icon based on notification type
  const getTypeIcon = () => {
    switch (type) {
      case 'order': return <ShoppingBag size={14} className="text-green-600" />;
      case 'cancelled': return <AlertCircle size={14} className="text-red-600" />;
      case 'promotion': return <Megaphone size={14} className="text-luxury" />;
      default: return <Bell size={14} className="text-blue-600" />;
    }
  };

  return (
    <div className={`p-3 rounded-md ${getBgColor()}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {getTypeIcon()}
            <h4 className="text-sm font-medium">{title}</h4>
            {!read && <span className="h-2 w-2 rounded-full bg-luxury"></span>}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
          <p className={`text-xs ${getTypeColor()} mt-2 flex items-center gap-1`}>
            {formatRelativeTime(date)}
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={onRead}
        >
          <Check size={14} />
        </Button>
      </div>
    </div>
  );
};

const NotificationDropdown: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {unreadCount > 0 ? (
            <>
              <BellDot size={20} />
              <span className="absolute -top-1 -right-1 bg-luxury text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            </>
          ) : (
            <Bell size={20} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-2">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <div className="flex gap-1">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={clearNotifications}>
                Clear all
              </Button>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto p-2 space-y-2">
          {notifications.length === 0 ? (
            <p className="text-sm text-center text-muted-foreground py-4">
              No notifications
            </p>
          ) : (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={() => markAsRead(notification.id)}
              />
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
