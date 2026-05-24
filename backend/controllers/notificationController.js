export const getNotifications = async (req, res) => {

    const notifications = [

        {
            id: 1,
            message: "Performance evaluation due in 3 days",
            time: "Today"
        },

        {
            id: 2,
            message: "New feedback received from Manager",
            time: "5 min ago"
        },

        {
            id: 3,
            message: "Training session scheduled for next week",
            time: "1 hour ago"
        }

    ];

    res.status(200).json({

        success: true,
        count: notifications.length,
        notifications

    });

};