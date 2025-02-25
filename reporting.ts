import { IncomingDocument, OutgoingDocument } from "./document";
import { Warehouse } from "./warehouse";

export class Reporting {
    private warehouse: Warehouse;
    private incomingDocuments: IncomingDocument[];
    private outgoingDocuments: OutgoingDocument[];

    constructor(warehouse: Warehouse) {
        this.warehouse = warehouse;
        this.incomingDocuments = [];
        this.outgoingDocuments = [];
    }

    createIncomingDocument(documentId: string): IncomingDocument {
        const document = new IncomingDocument(documentId, this.warehouse);
        this.incomingDocuments.push(document);
        return document;
    }

    createOutgoingDocument(documentId: string): OutgoingDocument {
        const document = new OutgoingDocument(documentId, this.warehouse);
        this.outgoingDocuments.push(document);
        return document;
    }


    getIncomingDocuments(): IncomingDocument[] {
        return this.incomingDocuments;
    }

    getOutgoingDocuments(): OutgoingDocument[] {
        return this.outgoingDocuments;
    }


    generateInventoryReport(): string[] {
        return this.warehouse.displayInventory();
    }

    generateTransactionReport(startDate: Date, endDate: Date): string[] {
        const result: string[] = [];
        result.push(`Transaction Report from ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`);
        
        result.push("\nIncoming Documents:");
        for (const doc of this.incomingDocuments) {
            const docDate = doc.getDate();
            if (docDate >= startDate && docDate <= endDate) {
                result.push(doc.display());
                result.push("---");
            }
        }
        
        result.push("\nOutgoing Documents:");
        for (const doc of this.outgoingDocuments) {
            const docDate = doc.getDate();
            if (docDate >= startDate && docDate <= endDate) {
                result.push(doc.display());
                result.push("---");
            }
        }
        
        return result;
    }
}