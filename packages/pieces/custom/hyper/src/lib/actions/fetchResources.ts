import { createAction, Property } from "@activepieces/pieces-framework";
import * as client from "../interface";

const getResourceOptions = async (params: any) => {
    const response = await client.getResources(params.auth as client.AuthContext);
    const resources = response.data;

    return ({
        options: resources.map((resource: { id: string }) => (
            {
                label: resource.id,
                value: resource.id
            }
        ))
    })
}

export const readResource = createAction({
    name: 'read_resource',
    displayName: 'Read resource',
    description: 'Read one or many objects of the specified resource',
    props: {
        resource: Property.Dropdown({
            displayName: 'Resource',
            description: 'Select a resource',
            required: true,
            refreshers: [],
            options: getResourceOptions,
        }),
        id: Property.ShortText({
            displayName: 'Id',
            description: 'Id of the resource object to read (or empty to read many)',
            required: false,
        })
    },
    async run(context) {
        const { resource, id } = context.propsValue;

        if (id) {
            return client.readOneResource(resource, id, context.auth as client.AuthContext);
        }
        return client.readManyResource(resource, context.auth as client.AuthContext);
    },
});

export const createResource = createAction({
    name: 'create_resource',
    displayName: 'Create resource',
    description: 'Create a new resource object',
    props: {
        resource: Property.Dropdown({
            displayName: 'Resource',
            description: 'Select a resource',
            required: true,
            refreshers: [],
            options: getResourceOptions,
        }),
        data: Property.Json({
            displayName: 'Data',
            description: 'Data to create the resource object with',
            required: true
        })
    },
    async run(context) {
        const { resource, data } = context.propsValue;

        return await client.createResource(resource, data, context.auth as client.AuthContext)
    }
})

export const updateResource = createAction({
    name: 'update_resource',
    displayName: 'Update resource',
    description: 'Update an existing resource object',
    props: {
        resource: Property.Dropdown({
            displayName: 'Resource',
            description: 'Select a resource',
            required: true,
            refreshers: [],
            options: getResourceOptions,
        }),
        id: Property.ShortText({
            displayName: 'Id',
            description: 'Id of the resource object to update',
            required: true,
        }),
        data: Property.Json({
            displayName: 'Data',
            description: 'Data to update the resource object with',
            required: true
        })
    },
    async run(context) {
        const { resource, id, data } = context.propsValue;

        return await client.updateResource(resource, id, data, context.auth as client.AuthContext);
    }
})

export const deleteResource = createAction({
    name: 'delete_resource',
    displayName: 'Delete resource',
    description: 'Delete an existing resource object',
    props: {
        resource: Property.Dropdown({
            displayName: 'Resource',
            description: 'Select a resource',
            required: true,
            refreshers: [],
            options: getResourceOptions,
        }),
        id: Property.ShortText({
            displayName: 'Id',
            description: 'Id of the resource object to delete',
            required: true,
        }),
    },
    async run(context) {
        const { resource, id } = context.propsValue;

        return await client.deleteResource(resource, id, context.auth as client.AuthContext);
    }
})

export const testAction = createAction({
    name: 'action_test',
    displayName: 'Test action',
    description: 'Test action',
    props: {
        id: Property.ShortText({
            displayName: 'Value',
            description: 'a sample value to use in run test',
            required: false,
        })
    },
    async run(context) {
        // const resources = await client.getResources();
        // return resources;
        return context;
    },
})