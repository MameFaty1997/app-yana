export interface LanguageAlphabet {
    language: string;
    uppercase: string[];
    lowercase: string[];
    vowels?: string[];
    consonants?: string[];
    notes?: {
        tension?: string[];
        gemination?: boolean;
        tones?: string;
        prenasalized?: string[];
        long_vowels?: string[];
        nasalization?: string[];
        homophones_homographes?: string[];
        homographes_non_homophones?: string[];
        other?: string;
    };
}

export const ALPHABETS: Record<string, LanguageAlphabet> = {
    balante: {
        language: 'Balante',
        uppercase: ['A', 'B', 'Ɓ', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L', 'M', 'N', 'Ñ', 'Ŋ', 'O', 'R', 'S', 'T', 'Ŧ', 'U', 'W', 'Y'],
        lowercase: ['a', 'b', 'ɓ', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'l', 'm', 'n', 'ñ', 'ŋ', 'o', 'r', 's', 't', 'ŧ', 'u', 'w', 'y'],
        notes: {
            tension: ['é', 'ée', 'í', 'íi', 'ó', 'óo', 'ú', 'úu'],
            gemination: true,
            tones: 'tons uniquement notés pour différencier bâ et bà',
            other: 'Balante qui signifie guerrier en balante.'
        }
    },
    joola: {
        language: 'Joola',
        uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'Ŋ', 'O', 'P', 'R', 'S', 'T', 'U', 'W', 'Y'],
        lowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'ŋ', 'o', 'p', 'r', 's', 't', 'u', 'w', 'y'],
        notes: {
            prenasalized: ['mb', 'nj', 'mp', 'ng', 'nd', 'nk', 'nt', 'nc'],
            tension: ['í', 'é', 'á', 'ó', 'ú', 'íi', 'ée', 'áa', 'óo', 'úu'],
            long_vowels: ['ii', 'ee', 'aa', 'oo', 'uu']
        }
    },
    hassaniya: {
        language: 'Hassaniya',
        uppercase: ['A', 'B', 'C', 'D', 'Ḍ', 'E', 'Ë', 'F', 'G', 'H', 'Ḥ', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'Q', 'R', 'S', 'Ṣ', 'Ŝ', 'T', 'Ṭ', 'Ŧ', 'U', 'V', 'W', 'X', 'Ẋ', 'Y', 'Z', 'Ż', 'Ẓ', 'ʼ'],
        lowercase: ['a', 'b', 'c', 'd', 'ḍ', 'e', 'ë', 'f', 'g', 'h', 'ḥ', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'q', 'r', 's', 'ṣ', 'ŝ', 't', 'ṭ', 'ŧ', 'u', 'v', 'w', 'x', 'ẋ', 'y', 'z', 'ż', 'ẓ', 'ʼ']
    },
    mancagne: {
        language: 'Mancagne',
        uppercase: ['A', 'B', 'C', 'D', 'E', 'Ë', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'Ŋ', 'O', 'P', 'R', 'S', 'Ş', 'T', 'Ŧ', 'Ţ', 'U', 'W', 'Y'],
        lowercase: ['a', 'b', 'c', 'd', 'e', 'ë', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'ŋ', 'o', 'p', 'r', 's', 'ş', 't', 'ŧ', 'ţ', 'u', 'w', 'y'],
        notes: {
            prenasalized: ['mb', 'mp', 'nd', 'nf', 'nj', 'ns', 'nş', 'nt', 'nŧ', 'nţ', 'ng', 'nk'],
            long_vowels: ['aa', 'ee', 'ii', 'oo', 'uu'],
            tension: ['ú', 'úu']
        }
    },
    mandinka: {
        language: 'Mandinka',
        uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'Ŋ', 'O', 'P', 'R', 'S', 'T', 'U', 'W', 'Y'],
        lowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'ŋ', 'o', 'p', 'r', 's', 't', 'u', 'w', 'y']
    },
    manjaku: {
        language: 'Manjaku',
        uppercase: ['A', 'B', 'C', 'D', 'E', 'Ë', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'Ŋ', 'O', 'P', 'R', 'S', 'Ŝ', 'T', 'Ţ', 'U', 'W', 'Y', 'Z'],
        lowercase: ['a', 'b', 'c', 'd', 'e', 'ë', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'ŋ', 'o', 'p', 'r', 's', 'ŝ', 't', 'ţ', 'u', 'w', 'y', 'z'],
        notes: {
            prenasalized: ['mb', 'mp', 'nk', 'nj', 'ng', 'nt', 'nd', 'nc', 'nţ'],
            long_vowels: ['aa', 'ee', 'ii', 'oo', 'uu'],
            tension: ['á', 'í', 'ó', 'ú', 'úu']
        }
    },
    menik: {
        language: 'Ménik',
        uppercase: ['A', 'B', 'Ɓ', 'C', 'D', 'Ɗ', 'E', 'Ë', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'Ŋ', 'O', 'P', 'R', 'S', 'Ŝ', 'T', 'U', 'W', 'Y', 'Ƴ'],
        lowercase: ['a', 'b', 'ɓ', 'c', 'd', 'ɗ', 'e', 'ë', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'ŋ', 'o', 'p', 'r', 's', 'ŝ', 't', 'u', 'w', 'y', 'ƴ'],
        notes: {
            prenasalized: ['mb', 'nd', 'nj', 'ng'],
            other: "fermeture de voyelle notée avec l'accent aigu : é, ó. Deux voyelles centrales : une forte notée ë et une faible notée è"
        }
    },
    noon: {
        language: 'Noon',
        uppercase: ['A', 'B', 'Ɓ', 'C', 'D', 'Ɗ', 'E', 'Ë', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'Ŋ', 'O', 'P', 'R', 'S', 'T', 'U', 'W', 'Y', 'Ƴ', 'ʼ'],
        lowercase: ['a', 'b', 'ɓ', 'c', 'd', 'ɗ', 'e', 'ë', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'ŋ', 'o', 'p', 'r', 's', 't', 'u', 'w', 'y', 'ƴ', 'ʼ'],
        notes: {
            prenasalized: ['mb', 'nd', 'nj', 'ng'],
            long_vowels: ['aa', 'ee', 'ëe', 'ii', 'oo', 'uu'],
            tension: ['é', 'ée', 'í', 'íi', 'ó', 'óo', 'ú', 'úu']
        }
    },
    onyan: {
        language: 'Onyan (bassari)',
        uppercase: ['A', 'B', 'Ɓ', 'C', 'D', 'Ɗ', 'E', 'Ë', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'R', 'S', 'Ŝ', 'T', 'U', 'W', 'Y', 'Ƴ'],
        lowercase: ['a', 'b', 'ɓ', 'c', 'd', 'ɗ', 'e', 'ë', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'r', 's', 'ŝ', 't', 'u', 'w', 'y', 'ƴ'],
        notes: {
            nasalization: ['ĥ', 'ŵ', 'ŷ'],
            tension: ['é', 'ó']
        }
    },
    pulaar: {
        language: 'Pulaar',
        uppercase: ['A', 'B', 'Ɓ', 'D', 'Ɗ', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'Ñ', 'N', 'Ŋ', 'O', 'P', 'R', 'S', 'T', 'U', 'W', 'Y', 'Ƴ', 'ʼ'],
        lowercase: ['a', 'b', 'ɓ', 'd', 'ɗ', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'ñ', 'n', 'ŋ', 'o', 'p', 'r', 's', 't', 'u', 'w', 'y', 'ƴ', 'ʼ']
    },
    saafi_saafi: {
        language: 'Saafi-saafi',
        uppercase: ['A', 'B', 'Ɓ', 'C', 'D', 'Ɗ', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'Ŋ', 'O', 'P', 'R', 'S', 'T', 'U', 'W', 'Y', 'Ƴ', '’'],
        lowercase: ['a', 'b', 'ɓ', 'c', 'd', 'ɗ', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'ŋ', 'o', 'p', 'r', 's', 't', 'u', 'w', 'y', 'ƴ', '’']
    },
    serer: {
        language: 'Sérère',
        uppercase: ['A', 'B', 'Ɓ', 'C', 'Ƈ', 'D', 'Ɗ', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'Ŋ', 'O', 'P', 'Ƥ', 'Q', 'R', 'S', 'T', 'Ƭ', 'U', 'W', 'X', 'Y', 'Ƴ', 'ʼ'],
        lowercase: ['a', 'b', 'ɓ', 'c', 'ƈ', 'd', 'ɗ', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'ŋ', 'o', 'p', 'ƥ', 'q', 'r', 's', 't', 'ƭ', 'u', 'w', 'x', 'y', 'ƴ', 'ʼ'],
        notes: {
            nasalization: ['mb', 'nd', 'nj', 'ng', 'nq']
        }
    },
    soninke: {
        language: 'Soninké',
        uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'Ŋ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'W', 'X', 'Y'],
        lowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'ŋ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'w', 'x', 'y']
    },
    wolof: {
        language: 'Wolof',
        uppercase: ['A', 'B', 'C', 'D', 'E', 'Ë', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'Ŋ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'W', 'X', 'Y'],
        lowercase: ['a', 'b', 'c', 'd', 'e', 'ë', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'ŋ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'w', 'x', 'y'],
        vowels: ['a', 'e', 'ë', 'i', 'o', 'u'],
        consonants: ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'ñ', 'ŋ', 'p', 'q', 'r', 's', 't', 'w', 'x', 'y'],
        notes: {
            nasalization: ['ã'],
            prenasalized: ['mb', 'nc', 'nd', 'ng', 'nj', 'nk', 'nq', 'nt'],
            homophones_homographes: ['a', 'b', 'd', 'f', 'g', 'i', 'k', 'l', 'm', 'o', 'p', 'r', 's', 't', 'y'],
            homographes_non_homophones: ['c', 'e', 'h', 'j', 'q', 'u', 'w'],
            other: "<à> correspond à <aa> devant nasalisation ou gémination. Voyelles plus ouvertes : à é ó. L'alphabet compte 27 lettres (21 consonnes et 6 voyelles)."
        }
    }
};
