/**
 * Service to manage the setting datastore
 */

import datastore from "./datastore";
import store from "./store";
import action from "../actions/bound-action-creators";

/**
 * Returns the settings datastore.
 *
 * @returns {Promise} Returns the settings datastore
 */
function getSettingsDatastore() {
    const type = "settings";
    const description = "key-value-settings";

    const onSuccess = function (results) {
        const data = {
            setting_password_length: store.getState().server.compliancePasswordGeneratorDefaultPasswordLength,
            setting_password_letters_uppercase:
                store.getState().server.compliancePasswordGeneratorDefaultLettersUppercase,
            setting_password_letters_lowercase:
                store.getState().server.compliancePasswordGeneratorDefaultLettersLowercase,
            setting_password_numbers: store.getState().server.compliancePasswordGeneratorDefaultNumbers,
            setting_password_special_chars: store.getState().server.compliancePasswordGeneratorDefaultSpecialChars,
        };

        action.settingsDatastoreLoaded(data);

        results.forEach((result) => (data[result["key"]] = result["value"]));

        action.settingsDatastoreLoaded(data);

        return results;
    };
    const onError = function () {
        // pass
    };
    return datastore.getDatastore(type).then(onSuccess, onError);
}

/**
 * Saves the settings datastore with given content
 *
 * @param {TreeObject} content The real object you want to encrypt in the datastore
 * @returns {Promise} Promise with the status of the save
 */
function saveSettingsDatastore(content) {
    const type = "settings";
    const description = "key-value-settings";

    return datastore.saveDatastoreContent(type, description, content);
}

const datastoreSettingService = {
    getSettingsDatastore: getSettingsDatastore,
    saveSettingsDatastore: saveSettingsDatastore,
};
export default datastoreSettingService;
