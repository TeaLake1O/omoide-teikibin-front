self.addEventListener("push", (event) => {
    const data = event.data ? event.data.json() : {};

    event.waitUntil(
        self.registration.showNotification(data.title ?? "おもいで定期便", {
            body: data.body ?? "",
            icon: "/pwa/omoide-logo-192.png",
            badge: "/pwa/badge-96.png",
            image: data.imageUrl,
            data: { url: data.url ?? "/" },
        }),
    );
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    const url = event.notification.data?.url || "/";

    event.waitUntil(
        (async () => {
            const wins = await clients.matchAll({
                type: "window",
                includeUncontrolled: true,
            });
            const client = wins[0];
            if (client) {
                await client.focus();
                client.navigate(url);
                return;
            }
            await clients.openWindow(url);
        })(),
    );
});
