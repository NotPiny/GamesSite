<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    export let value;
    export let type = 'text';
    export let label = '';
    export let placeholder = '';
    export let required = false;
    export let disabled = false;
    export let readonly = false;

    const id = Math.random().toString(36).substring(2);

    onMount(() => {
        const input = document.getElementById(id);

        input.readonly = readonly;
        input.disabled = disabled;
        input.required = required;
    });
</script>

<sl-input 
    value={value}
    type={type} 
    label={label} 
    placeholder={placeholder} 
    id={id}

    on:input={e => {
        value = e.target.value;
    }}
></sl-input>