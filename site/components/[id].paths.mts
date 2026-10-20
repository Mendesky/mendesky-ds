// 每份元件規格產生一頁：/components/<id>
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exportCoreDocs } from '../../scripts/export-docs.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export default {
  watch: ['../../src/docs/components/*.ts'],
  paths() {
    return exportCoreDocs(root).specs.map(({ spec }: { spec: { id: string; name: string } }) => ({
      params: { id: spec.id, name: spec.name },
    }));
  },
};
