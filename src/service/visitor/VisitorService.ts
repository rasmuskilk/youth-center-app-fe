import { BaseService } from '../base/BaseService';
import { Visitor } from '../../domain/Visitor';

export class VisitorService extends BaseService<Visitor> {
    constructor() {
        super(`visitors`);
    }
}
