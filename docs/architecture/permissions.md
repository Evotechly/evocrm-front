# Permission contract

The source audit in `Screen/08-PERMISSION-MATRIX.md` separates safe GET access from write permissions and applies `SimpleMode::blocks()` independently of user capabilities. The frontend models permission context as `role`, `permissions`, and `simpleMode` so route visibility and action affordances can be tested without duplicating Laravel policy logic.

The initial owner fixture uses `crm.view`, `crm.edit`, `crm.bulk`, `desk.view`, `quotes.view`, and `settings.manage`. A production adapter must pass authoritative permissions from Laravel/Inertia. The frontend may hide actions, but Laravel remains the final authorization boundary.
