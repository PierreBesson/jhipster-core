/**
 * Copyright 2013-2018 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see http://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const JDLFieldValidator = require('./jdl_field_validator');
const { entities: EntityErrors } = require('../../exceptions/error_cases');

module.exports = {
  isValid,
  validate
};

/**
 * Checks whether the JDL entity is valid.
 * @param {JDLEntity} jdlEntity the entity to check for errors.
 * @returns {boolean} whether the entity is valid.
 */
function isValid(jdlEntity) {
  const errors = validate(jdlEntity);
  return errors.length === 0;
}

/**
 * Validates a JDL entity
 * @param {JDLEntity} jdlEntity the entity to check for errors.
 * @return {string[]} the error list.
 */
function validate(jdlEntity) {
  if (!jdlEntity) {
    throw new Error('A JDL entity has to be passed to be validated.');
  }
  const errors = [];
  if (!jdlEntity.name) {
    errors.push(EntityErrors.NoName);
  }
  if (!jdlEntity.tableName) {
    errors.push(EntityErrors.NoTableName);
  }
  if (!('fields' in jdlEntity)) {
    errors.push(EntityErrors.NoFields);
  }
  if (jdlEntity.fields) {
    for (let i = 0; i < jdlEntity.fields.length; i++) {
      const fieldsErrors = JDLFieldValidator.validate(jdlEntity.fields[i]);
      if (fieldsErrors.length !== 0) {
        errors.push(`For field #${i + 1}: ${fieldsErrors}`);
      }
    }
  }
  return errors;
}
