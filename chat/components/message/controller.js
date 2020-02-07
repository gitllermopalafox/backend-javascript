const store = require('./store');

/**
 * Funcion para agregar los mensajes
 * @param {*} user 
 */
function addMessage(chat, user, message) {
    return new Promise((resolve, reject) => {
        if(!chat || !user || !message) {
            console.error('[messageController] No hay usuario o mensaje');
            return reject('Los datos son incorrectos');
        }

        const fullMessage = {
            chat,
            user,
            message,
            date: new Date()
        };
    
        store.add(fullMessage);
        resolve(fullMessage);
    })
}

/**
 * Funcion para obtener los mensajes
 */
function getMessages(filterMessages) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterMessages));
    });
}

function updateMessage(id, message) {
    return new Promise(
        async (resolve, reject) => {
            if(!id || !message) {
                reject('Invalid data');
                return false;
            }
            const result = await store.updateText(id, message);
            resolve(result);
        }
    );
}

/**
 * Eliminar mensaje
 * @param {string} id 
 */
function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        if(!id) {
            reject('Id invaldo');
            return false;
        }
        store.remove(id)
        .then(() => {
            resolve();
        })
        .catch(e => {
            reject(e);
        })

    });
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
}