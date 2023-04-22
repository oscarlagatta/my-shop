export function useCloudinary() {
    function openWidget(): Promise<{img: string, tmb: string}>{

        return new Promise((resolve, reject)=> {
            const uploadWidget = window.cloudinary.openUploadWidget({
                    cloudName: 'dgptg7645',
                    uploadPreset: 'ml_default',
                    sources: ['local', 'url', 'camera']
                },
                function (error: any, result: any) {
                    if(!error && result.event === 'success') {
                        const img = result.info.url;
                        const tmb = result.info.thumbnail_url;

                        resolve({
                            img, tmb
                        });

                        // setFormData( state => ({ ...state, img, tmb}));
                    } else {
                        reject(error)
                    }
                }
            );

            uploadWidget.open();
        })

    }

    return {
        openWidget
    }
}