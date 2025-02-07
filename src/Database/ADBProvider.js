/* eslint-disable no-unused-vars */
import AxonClient from '../AxonClient';

import AxonError from '../Errors/AxonError';
import NoAbstractInstanceException from '../Errors/NoAbstractInstanceException';
import NotImplementedException from '../Errors/NotImplementedException';

/**
 * @typedef {String|Boolean|Object.<string, any>|Array<any>|Number|Date} updateDBVal
 * @typedef {import('../AxonOptions').default} AxonOptions
 * @typedef {import('../Core/Models/AxonConfig').default} AxonConfig
 * @typedef {import('../Core/Models/GuildConfig').default} GuildConfig
 * @typedef {{
 * id: String, prefix: String, createdAt: Date, updatedAt: Date, bannedUsers: Array<String>, bannedGuilds: Array<String>
 * }} AxonConfigRaw
 * @typedef {{
 * guildID: string, prefixes: Array<String>, createdAt: Date, updatedAt: Date, modules: Array<String>, commands: Array<String>, listeners: Array<String>,
 * ignoredUsers: Array<String>, ignoredRoles: Array<String>, ignoredChannels: Array<String>, modOnly: Boolean, modRoles: Array<String>, modUsers: Array<String>
 * }} GuildConfigRaw
 * @typedef {import('../Utility/Constants/AxonEnums').DB_TYPES} DB_TYPES
 */

/**
 * Abstract class for all DB services.
 * Extend this class to create your own Database provider.
 * You just need to write these methods for the framework to be able to interact with the database.
 *
 * The provider creates guildconfigs with DB data.
 *
 * @author KhaaZ
 *
 * @abstract
 * @class ADBProvider
 *
 * @prop {AxonClient} axon - The AxonClient
 * @prop {DB_TYPES} type - The Database type
 */
class ADBProvider {
    /**
     * Creates an instance of ADBProvider.
     *
     * @param {AxonClient} axonClient
     * @param {DB_TYPES} [type=0]
     * @memberof ADBProvider
     */
    constructor(axonClient, type = 0) {
        if (this.constructor === 'ADBProvider') {
            throw new NoAbstractInstanceException();
        }

        if (!axonClient || !(axonClient instanceof AxonClient) ) {
            throw new AxonError('First argument needs to be the AxonClient.', 'ADBProvider');
        }

        this.axon = axonClient;
        this.type = type;
    }

    /**
     * Init the ADBProvider.
     * Method called just after instantiation. Can be overridden with anything that will be used by the provider.
     *
     * @memberof ADBProvider
     */
    init() {
        throw new NotImplementedException();
    }

    // **** INIT **** //

    /**
     * Initialises a default Axon config.
     *
     * @returns {Promise<AxonConfig | null>} Newly created Axon config from the DB
     *
     * @memberof ADBProvider
     */
    async initAxon() {
        throw new NotImplementedException();
    }

    /**
     * Initialises a default Guild config.
     * Use default AxonClient prefix settings when creating the new guild config.
     *
     * @param {String} gID - Guild ID
     *
     * @returns {Promise<GuildConfig|null>} Newly created Guild config from the DB
     *
     * @memberof ADBProvider
     */
    async initGuild(gID) {
        throw new NotImplementedException();
    }

    // **** FETCHERS **** //

    /**
     * Retrieves the axon config from the DB
     *
     * @returns {Promise<AxonConfig|null>} AxonSchema Object or null
     *
     * @memberof ADBProvider
     */
    async fetchAxon() {
        throw new NotImplementedException();
    }

    /**
     * Retrieves the Guild config for the specified guild.
     *
     * @param {String} gID - Guild ID
     * @returns {Promise<GuildConfig|null>}
     *
     * @memberof ADBProvider
     */
    async fetchGuild(gID) {
        throw new NotImplementedException();
    }

    // **** UPDATES **** //

    /**
     * Update AxonConfig in the DB.
     * Update the specific key with the value given as second parameters.
     * Generic method to update Database.
     *
     * @param {String} key - The identifier in the Database
     * @param {updateDBVal} value - The value to update in the DB
     * @returns {Promise<Boolean>} Whether the request was successful or not
     *
     * @memberof ADBProvider
     */
    async updateAxon(key, value) {
        throw new NotImplementedException();
    }

    /**
     * Update GuildConfig in the DB.
     * Update the specific key with the value given as third parameters.
     * Specify the guild with the guild ID.
     * Generic method to update Database.
     *
     * @param {String} key - The identifier in the Database
     * @param {String} gID - The guild ID to update
     * @param {updateDBVal} value - The value to update in the DB
     * @returns {Promise<Boolean>} Whether the request was successful or not
     *
     * @memberof ADBProvider
     */
    async updateGuild(key, gID, value) {
        throw new NotImplementedException();
    }

    /**
     * Updates the Axon config in the DB with a new Axon config object.
     *
     * @param {AxonConfig|AxonConfigRaw} data - the schema object to update
     * @returns {Promise<AxonConfig|null>} Updated AxonConfig from the DB
     *
     * @memberof ADBProvider
     */
    async saveAxon(data) {
        throw new NotImplementedException();
    }

    /**
     * Updates the given guild in the DB with a new schema object.
     *
     * @param {String} gID - Guild ID
     * @param {GuildConfig|GuildConfigRaw} data - The schema object to update
     * @returns {Promise<GuildConfig|null>} Updated GuildConfig from the DB
     *
     * @memberof ADBProvider
     */
    async saveGuild(gID, data) {
        throw new NotImplementedException();
    }

    get GuildConfig() {
        return this.axon.extensions.GuildConfig;
    }

    get AxonConfig() {
        return this.axon.extensions.AxonConfig;
    }
}

export default ADBProvider;
