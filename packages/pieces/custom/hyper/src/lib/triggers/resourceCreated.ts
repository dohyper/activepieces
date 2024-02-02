import { PieceAuth, TriggerStrategy, createTrigger } from "@activepieces/pieces-framework";


export const resourceCreated = createTrigger({
    auth: PieceAuth.None(),
    name: 'resource_created',
    displayName: "resource created",
    description: "Triggered when a resource object is created",
    type: TriggerStrategy.POLLING,
    props: {
    },

    async onEnable() {
        console.log("ENABLED");
    },
    async onDisable() {
        console.log("DISABLED");
    },

    async run(context) {
        // const body = context.payload.body as { form_response: unknown };
        return [{ test: "test" }];
    },

    async test(context) {
        console.log("CONTEXT", context);
        return [{ test: "test" }]
    },

    sampleData: {
        data: [],
        meta: {
            size: 0
        }
    }
});