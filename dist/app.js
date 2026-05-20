const { createApp, ref, computed, onMounted } = Vue;

const app = createApp({
    setup() {
        const selectedGame = ref("");
        const games = ["Super Mario 64", "Super Mario Odyssey"];

        const players = [
            {
                handle: "CCG-01",
                rank: "S-RANK",
                name: "Serenmew",
                imageUrl: "/seren.jpg",
                games: ["Super Mario 64", "Super Mario Odyssey"],
                tags: ["captain", "70-star", "any%"],
                socials: [
                    { icon: "/twitch.svg",     link: "https://www.twitch.tv/serenmow" },
                    { icon: "/discord.svg",    link: "#" },
                    { icon: "/x-twitter.svg",  link: "#" },
                    { icon: "/youtube.svg",    link: "#" },
                ],
                description:
                    "Captain of the Cool Cat Gang. Hunts cosmic stars at terminal velocity. " +
                    "Speedrunning since the Y2K bug missed.",
            },
            {
                handle: "CCG-02",
                rank: "A-RANK",
                name: "Silver",
                imageUrl: "/silver.jpg",
                games: ["Super Mario 64"],
                tags: ["16-star", "blindfold-curious"],
                socials: [
                    { icon: "/twitch.svg",     link: "#" },
                    { icon: "/discord.svg",    link: "#" },
                    { icon: "/x-twitter.svg",  link: "#" },
                    { icon: "/youtube.svg",    link: "#" },
                ],
                description:
                    "Frame-perfect cat. Lives in the courtyard. Knows the BLJ like a love language.",
            },
            {
                handle: "CCG-03",
                rank: "A-RANK",
                name: "Tharoah",
                imageUrl: "/tharoah.jpg",
                games: ["Super Mario 64"],
                tags: ["0-star", "menu-ninja"],
                socials: [
                    { icon: "/twitch.svg",     link: "#" },
                    { icon: "/discord.svg",    link: "#" },
                    { icon: "/x-twitter.svg",  link: "#" },
                    { icon: "/youtube.svg",    link: "#" },
                ],
                description:
                    "Pharaoh of the pause menu. Reincarnated specifically to beat Bowser in under 7 minutes.",
            },
            {
                handle: "CCG-04",
                rank: "S-RANK",
                name: "Animee",
                imageUrl: "/anime.jpg",
                games: ["Super Mario 64", "Super Mario Odyssey"],
                tags: ["odyssey", "moon-hunter"],
                socials: [
                    { icon: "/twitch.svg",     link: "#" },
                    { icon: "/discord.svg",    link: "#" },
                    { icon: "/x-twitter.svg",  link: "#" },
                    { icon: "/youtube.svg",    link: "#" },
                ],
                description:
                    "Cap-throw connoisseur. Collects moons in clean parabolas. Theme song plays automatically.",
            },
        ];

        const filteredPlayers = computed(() =>
            !selectedGame.value
                ? players
                : players.filter(p => p.games.includes(selectedGame.value))
        );

        return { selectedGame, games, players, filteredPlayers };
    },

    template: `
        <article v-for="(player, i) in filteredPlayers"
                 :key="player.name"
                 class="player-card reveal"
                 :style="{ animationDelay: (i * 110) + 'ms' }">

            <span class="card-corner tl"></span>
            <span class="card-corner tr"></span>
            <span class="card-corner bl"></span>
            <span class="card-corner br"></span>

            <div class="player-portrait">
                <span class="player-id">ID :: {{ player.handle }}</span>
                <span class="player-rank">{{ player.rank }}</span>
                <img :src="player.imageUrl" :alt="player.name">
            </div>

            <div class="player-body">
                <h2 class="player-name glitch">{{ player.name }}</h2>
                <div class="player-tags">
                    <span v-for="tag in player.tags" :key="tag" class="player-tag">{{ tag }}</span>
                </div>
                <p class="player-desc">{{ player.description }}</p>
                <div class="player-socials">
                    <a v-for="social in player.socials"
                       :key="social.icon"
                       :href="social.link"
                       target="_blank" rel="noopener">
                        <img :src="social.icon">
                    </a>
                </div>
            </div>
        </article>
    `,
});

app.mount("#roster_grid");

// Filter pills (vanilla — bridges to Vue's ref via custom event hook)
window.addEventListener("DOMContentLoaded", () => {
    const pills = document.querySelectorAll("#filter_row .filter-pill");
    pills.forEach(pill => {
        pill.addEventListener("click", () => {
            pills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            const game = pill.dataset.game || "";
            // Mutate Vue's reactive ref by reaching into the app proxy
            const root = app._instance;
            if (root && root.setupState) {
                root.setupState.selectedGame = game;
            }
        });
    });
});
