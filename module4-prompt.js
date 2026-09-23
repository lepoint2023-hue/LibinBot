'use strict';

/* ⚠️ Ce fichier est référencé par index.html (<script src="module4-prompt.js">)
   mais son résultat n'est PAS utilisé : module6-api.js envoie toujours
   systemPrompt: "" au Worker Cloudflare, qui lit le prompt réel depuis le KV.
   buildPrompt() doit donc simplement exister (sinon erreur JS au chargement)
   — son contenu n'a aucun effet sur les réponses de l'IA. Gardé à jour par
   simple hygiène, au cas où il serait un jour réactivé. */

function buildPrompt(svcId, locale) {

  const knownIds = ['population','urbanisme','finances','env','social','enfance',
                    'salles','cimetiere','events','rh','college','autre'];
  const safeId   = knownIds.includes(svcId) ? svcId : null;
  const svcLabel = safeId
    ? (getSvcs(locale).find(s => s.id === safeId)?.label || safeId)
    : null;

  const langInstr = {
    fr: 'Réponds TOUJOURS en français, de façon directe et concise. Pas de formule d\'introduction.',
    nl: 'Antwoord ALTIJD in het Nederlands, direct en duidelijk. Geen inleidende formules.',
    de: 'Antworte IMMER auf Deutsch, direkt und klar. Keine einleitenden Floskeln.',
  }[locale] || 'Réponds TOUJOURS en français, directement.';

  return `Tu es l'assistante IA officielle de la Commune de Libin (Province de Luxembourg, Belgique). ${langInstr}
${safeId ? `Service choisi : **${svcLabel}**. Priorité à ce domaine.` : ''}

## RÈGLES CRITIQUES
- Assistante institutionnelle : pas de supposition, pas d'invention
- Information absente ou incertaine → dire clairement + contact officiel
- Ne jamais inventer : horaires supposés, procédures inventées, montants approximatifs
- Question ambiguë : poser UNE question de clarification

## IDENTITÉ
- Commune de Libin — Province de Luxembourg, Arrondissement de Neufchâteau
- Administration : Rue du Commerce 14, 6890 Libin
- Tél : +32 61 26 08 10 | Site : https://www.libin.be

## INFORMATION INCONNUE
"Je n'ai pas cette information, contactez le +32 61 26 08 10"`;

}
