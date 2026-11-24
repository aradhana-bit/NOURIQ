import { listResource, createResource, updateResource, deleteResource } from '../models/resource.model.js';
export async function list(req, res, next) {
  try { res.json({ data: await listResource(req.params.resource, req.query.search || '') }); } catch (error) { next(error); }
}
export async function create(req, res, next) {
  try { const id = await createResource(req.params.resource, req.body); res.status(201).json({ message: 'Record created successfully', id }); } catch (error) { next(error); }
}
export async function update(req, res, next) {
  try { const affected = await updateResource(req.params.resource, req.params.id, req.body); if (!affected) return res.status(404).json({ message: 'Record not found or unchanged' }); res.json({ message: 'Record updated successfully' }); } catch (error) { next(error); }
}
export async function remove(req, res, next) {
  try { const affected = await deleteResource(req.params.resource, req.params.id); if (!affected) return res.status(404).json({ message: 'Record not found' }); res.json({ message: 'Record deleted successfully' }); } catch (error) { next(error); }
}
