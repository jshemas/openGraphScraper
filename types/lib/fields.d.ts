import type { OgObjectInteral } from './types';
type Fields = {
    multiple: boolean;
    property: string;
    fieldName: keyof OgObjectInteral;
}[];
/**
 * array of meta tags ogs is looking for
 *
 * @return {array} array of meta tags
 *
 */
declare const fields: Fields;
export default fields;
