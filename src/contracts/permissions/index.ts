export type Permission =
  | 'crm.view'
  | 'crm.edit'
  | 'crm.bulk'
  | 'desk.view'
  | 'desk.manage'
  | 'quotes.view'
  | 'settings.manage';
export interface PermissionContext {
  role: 'owner' | 'admin' | 'member';
  permissions: Permission[];
  simpleMode: boolean;
}
