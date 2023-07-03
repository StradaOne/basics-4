const URL = {
    urlToken: 'https://edu.strada.one/api/user',
    urlDataProfile: 'https://edu.strada.one/api/user/me',
};

// запрос для получение токена
async function getToken(url, email) {
    try {
        showHidePreload('flex');

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ email }),
        });

        const answer = await response.json();

        if (response.status === 200) {
            console.log(answer);

            return { status: 'true' };
        } else {
            console.log('ошибка', answer);
            console.log(response.status);

            return { status: 'false' };
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    } finally {
        showHidePreload('none');
    }
}

// запрос для авторизации
async function confirmationAuthorization(url) {
    try {
        showHidePreload('flex');

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${getCookie('token')}`,
            },
        });

        const answer = await response.json();

        if (response.status === 200) {
            // console.log(answer.name);

            return { status: 'true', answer };
        } else {
            console.log('ошибка', answer);
            console.log(response.status);

            return { status: 'false', answer };
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    } finally {
        showHidePreload('none');
    }
}

// запрос на смену имени
async function renameNickname(url, name) {
    try {
        showHidePreload('flex');

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${getCookie('token')}`,
            },
            body: JSON.stringify({ name }),
        });

        const answer = await response.json();

        if (response.status === 200) {
            renderNicknameProfile(answer.name);
            console.log(answer);

            return { status: 'true', answer };
        } else {
            console.log('ошибка', answer);
            console.log(response.status);

            return { status: 'false', answer };
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    } finally {
        showHidePreload('none');
    }
}

export { URL, getToken, confirmationAuthorization, renameNickname };
