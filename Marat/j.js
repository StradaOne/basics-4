window.addEventListener("DOMContentLoaded", () => {

    const cookieStorage = {
        getItem: (key) => {
            const cookies = document.cookie.split(";")
                .map(cookie => cookie.split("="))
                .reduce((acc, [key, value]) => ({...acc,
                    [key.trim()]: value
                }), {});

                return cookies[key];

        },

        setItem: (key, value) => {
            document.cookie = `${key} =${value}; max-age=10`
        }
    }



    const storageType = cookieStorage;
    const consentPropertyType = 'site_consent';

    const hasConsented = () => storageType.getItem(consentPropertyType) === 'true' ? true : false;
    const toggleStorage = (prop) => storageType.setItem(consentPropertyType, prop);

    const popup = document.querySelector(".popup"),
        btnConfirm = document.querySelector("[data-confirm]"),
        btnCancel = document.querySelector('[data-cancel]');

    if (hasConsented()) {
        console.log("Loading...");

    }
    else {
        popup.classList.add("pop_active");

    }
    btnConfirm.addEventListener("click", () => {
        toggleStorage(true);
        popup.classList.remove("pop_active");
        console.log("Loading...");
    });

    btnCancel.addEventListener("click", () => {
        toggleStorage(false);
        popup.classList.remove("pop_active");
    })
})
