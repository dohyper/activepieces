
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
import { createResource, readResource, updateResource, deleteResource, testAction } from "./lib/actions/fetchResources";
import { resourceCreated } from "./lib/triggers/resourceCreated";
import { authentication } from "./lib/authentication";

export const hyper = createPiece({
  displayName: "Hyper",
  auth: authentication,
  minimumSupportedRelease: '0.9.0',
  logoUrl: "https://asset.brandfetch.io/idMnLVRFQi/idgLOeY0Km.svg",
  authors: [],
  actions: [readResource, createResource, updateResource, deleteResource, testAction],
  triggers: [resourceCreated],
});
