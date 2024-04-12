import {createSignal} from "solid-js";
import {invoke} from "@tauri-apps/api/core";

export function Greet() {
    const [greetMsg, setGreetMsg] = createSignal("");
    const [name, setName] = createSignal("");

    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
        return setGreetMsg(await invoke("greet", { name: name() }));
    }

    return <>
        <form
            class="row"
            onSubmit={(e) => {
                e.preventDefault();
                greet();
            }}
        >
            <input
                id="greet-input"
                onChange={(e) => setName(e.currentTarget.value)}
                placeholder="Enter a name..."
            />
            <button type="submit">Greet</button>
        </form>

        <p class="row">{greetMsg()}</p>
    </>
}