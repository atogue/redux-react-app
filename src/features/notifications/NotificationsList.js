import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatDistanceToNow, parseISO } from 'date-fns'
import classnames from 'classnames'

import { selectAllUsers } from '../users/usersSlice'
import { selectAllNotifications, allNotificationsRead } from './notificationsSlice'

export const NotificationsList = () => {
    const dispatch = useDispatch()
    const notifications = useSelector(selectAllNotifications)
    const users = useSelector(selectAllUsers)

    useEffect(() => {
        dispatch(allNotificationsRead())
    })
    const renderedNotifications = notifications.map(notification => {
        const date = parseISO(notification.date)
        const timeAgo = formatDistanceToNow(date)
        const user = users.find(user => user.id === notification.user) || {
            name: 'Unknow User'
        }

        const notificationClassname = classnames(`${notification.isNew ? 'post-notification-new': 'post-notification'}`, {
            new: notification.isNew //seems to be deprecated: no blink display
        })

        return (
            <div key={notification.id} className={notificationClassname}>
                <div>
                    <b>{user.name}</b> {notification.message}
                </div>
                <div title={notification.date}>
                    <i>{timeAgo} ago</i>
                </div>
            </div>
        )
    })

    return (
        <section>
            <h2>Notifications</h2>
            {renderedNotifications}
        </section>
    )
}