export class JsonResponse extends Response {
    constructor(body: Object, init?: Object) {
        const jsonBody = JSON.stringify(body);
        init = init || {
            headers: {
                "content-type": "application/json;charset=UTF-8",
            },
        };

        super(jsonBody, init)
    }
}