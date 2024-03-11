import React from 'react';

export interface Visitor {
    uuid: string;
    firstName: string;
    lastName: string;
    age: number;
    address?: number;
    school?: number;
    parentName?: number;
    parentPhone?: number;
    parentEmail?: number;
    notes?: number;
}
