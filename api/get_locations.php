<?php
require_once __DIR__ . '/config.php';

try {
    $locations = $db->query("SELECT * FROM locations ORDER BY base DESC, name ASC")->fetchAll(PDO::FETCH_ASSOC);
    foreach ($locations as &$loc) {
        $loc['base'] = (bool)$loc['base'];
        $loc['lat'] = (float)$loc['lat'];
        $loc['lng'] = (float)$loc['lng'];
    }
    jsonResponse(['success' => true, 'locations' => $locations]);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}
