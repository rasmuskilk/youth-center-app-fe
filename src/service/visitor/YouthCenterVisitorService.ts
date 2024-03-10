import { BaseService } from '../base/BaseService';
import { Visitor } from '../../domain/Visitor';

export class YouthCenterVisitorService extends BaseService<Visitor> {
    constructor(uuid: string) {
        super(`centers/${uuid}/visitors`);
    }
}
