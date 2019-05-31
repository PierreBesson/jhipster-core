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

const _ = require('lodash');
const merge = require('../utils/object_utils').merge;
const JDLFieldValidator = require('./validators/jdl_field_validator');

class JDLEntity {
  constructor(args) {
    const merged = merge(defaults(), args);
    if (!merged.name) {
      throw new Error('The entity name is mandatory to create an entity.');
    }
    this.name = merged.name;
    this.tableName = merged.tableName || merged.name;
    this.fields = merged.fields;
    this.comment = merged.comment;
  }

  addField(field) {
    if (!field) {
      throw new Error('A field has to be passed to be added to an entity.');
    }
    const errors = JDLFieldValidator.validate(field);
    if (errors.length !== 0) {
      let fieldName = '';
      if (field) {
        fieldName = field.name;
      }
      throw new Error(
        `The passed field '${fieldName}' must be valid to be added in entity '${this.name}'.\n` +
          `Errors: ${errors.join(', ')}`
      );
    }
    this.fields[field.name] = field;
  }

  toString() {
    let stringifiedEntity = '';
    if (this.comment) {
      stringifiedEntity += `/**\n${this.comment
        .split('\n')
        .map(line => ` * ${line}\n`)
        .join('')} */\n`;
    }
    stringifiedEntity += `entity ${this.name}`;
    if (this.tableName && _.snakeCase(this.name) !== _.snakeCase(this.tableName)) {
      stringifiedEntity += ` (${this.tableName})`;
    }
    if (Object.keys(this.fields).length !== 0) {
      stringifiedEntity += ` {\n${formatFieldObjects(this.fields)}\n}`;
    }
    return stringifiedEntity;
  }
}

module.exports = JDLEntity;

function defaults() {
  return {
    fields: {}
  };
}

function formatFieldObjects(jdlFieldObjects) {
  let string = '';
  Object.keys(jdlFieldObjects).forEach(jdlField => {
    string += `${formatFieldObject(jdlFieldObjects[jdlField])}`;
  });
  string = `${string.slice(0, string.length - 2)}`;
  return string;
}

function formatFieldObject(jdlFieldObject) {
  let string = '';
  const lines = jdlFieldObject.toString().split('\n');
  for (let j = 0; j < lines.length; j++) {
    string += `  ${lines[j]}\n`;
  }
  string = `${string.slice(0, string.length - 1)},\n`;
  return string;
}
