export default interface SchemaElement {
    id: string;
    name: string;
    dataType: string | null;
    minOccurs: string | null;
    maxOccurs: string | null;
    minLength: string | null;
    maxLength: string| null;
    pattern: string | null;
    fractionDigits: string | null;
    totalDigits: string | null;
    minInclusive: string | null;
    maxInclusive: string | null;
    values: string[] | null;
    isCurrency: boolean | null;
    xpath: string | null;
    elements: SchemaElement[];
}
