import * as assert from 'assert';
import { describe, beforeEach, it } from 'mocha';

import { TslintConfig } from '../../workspace/angular';

describe('TSLint config', () => {

    let tslintConfig: TslintConfig;

    beforeEach(() => {
        tslintConfig = new TslintConfig();
    });

    describe('Component suffixes', () => {

        it('with 1 suffix', () => {

            const config = tslintConfig['validateConfig']({
                rules: {
                    'component-class-suffix': [true, 'Page']
                }
            });
            tslintConfig['initComponentSuffixes'](config);

            assert.strictEqual(true, tslintConfig.hasComponentSuffix('page'));
            assert.strictEqual(true, tslintConfig.hasComponentSuffix('Page'));

        });

        it('with 2 suffixes', () => {

            const config = tslintConfig['validateConfig']({
                rules: {
                    'component-class-suffix': [true, 'Component', 'Page']
                }
            });
            tslintConfig['initComponentSuffixes'](config);

            assert.strictEqual(true, tslintConfig.hasComponentSuffix('page'));
            assert.strictEqual(true, tslintConfig.hasComponentSuffix('Page'));
            assert.strictEqual(true, tslintConfig.hasComponentSuffix('component'));
            assert.strictEqual(true, tslintConfig.hasComponentSuffix('Component'));
            assert.strictEqual(false, tslintConfig.hasComponentSuffix('Elmo'));
            assert.strictEqual(false, tslintConfig.hasComponentSuffix('elmo'));

        });

        it('with no config', () => {

            const config = tslintConfig['validateConfig'](undefined);
            tslintConfig['initComponentSuffixes'](config);

            assert.strictEqual(false, tslintConfig.hasComponentSuffix('page'));

        });

        it('with no suffix rule', () => {

            const config = tslintConfig['validateConfig']({
                rules: {
                    'no-console': true
                }
            });
            tslintConfig['initComponentSuffixes'](config);

            assert.strictEqual(false, tslintConfig.hasComponentSuffix('page'));

        });

        it('with boolean rule', () => {

            const config = tslintConfig['validateConfig']({
                rules: {
                    'component-class-suffix': true
                }
            });
            tslintConfig['initComponentSuffixes'](config);

            assert.strictEqual(false, tslintConfig.hasComponentSuffix('page'));

        });

        it('with array rule but no suffix', () => {

            const config = tslintConfig['validateConfig']({
                rules: {
                    'component-class-suffix': [true]
                }
            });
            tslintConfig['initComponentSuffixes'](config);

            assert.strictEqual(false, tslintConfig.hasComponentSuffix('page'));

        });

    });

});
