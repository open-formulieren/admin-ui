import type {Mock} from '@vitest/spy';
import {HttpResponse, http} from 'msw';

import {SESSION_EXPIRES_IN_HEADER} from '@/guard/session/session-expiry';

import {BASE_URL} from './base';

const DEFAULT_AUTHENTICATION_PLUGINS = [
  {
    id: 'demo',
    label: 'Demo BSN',
    providesAuth: ['bsn'],
    schema: null,
  },
  {
    id: 'demo-kvk',
    label: 'Demo KvK number',
    providesAuth: ['kvk'],
    schema: null,
  },
  {
    id: 'demo-outage',
    label: 'Demo Outage',
    providesAuth: ['bsn'],
    schema: null,
  },
  {
    id: 'bsn-outage',
    label: 'BSN Outage',
    providesAuth: ['bsn'],
    schema: null,
  },
  {
    id: 'kvk-outage',
    label: 'KvK Outage',
    providesAuth: ['kvk'],
    schema: null,
  },
  {
    id: 'digid-mock',
    label: 'DigiD Mock',
    providesAuth: ['bsn'],
    schema: null,
  },
  {
    id: 'digid',
    label: 'DigiD',
    providesAuth: ['bsn'],
    schema: {
      type: 'object',
      properties: {
        loa: {
          type: 'string',
          enum: [
            '',
            'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
            'urn:oasis:names:tc:SAML:2.0:ac:classes:MobileTwoFactorContract',
            'urn:oasis:names:tc:SAML:2.0:ac:classes:Smartcard',
            'urn:oasis:names:tc:SAML:2.0:ac:classes:SmartcardPKI',
          ],
          enumNames: ['', 'DigiD Basis', 'DigiD Midden', 'DigiD Substantieel', 'DigiD Hoog'],
          title: 'options LoA',
          description: 'The minimal LoA for authentication.',
        },
      },
    },
  },
  {
    id: 'eherkenning',
    label: 'eHerkenning',
    providesAuth: ['kvk'],
    schema: null,
  },
  {
    id: 'eidas',
    label: 'eIDAS',
    providesAuth: ['pseudo'],
    schema: null,
  },
  {
    id: 'digid_oidc',
    label: 'DigiD via OpenID Connect',
    providesAuth: ['bsn'],
    schema: null,
  },
  {
    id: 'eherkenning_oidc',
    label: 'eHerkenning via OpenID Connect',
    providesAuth: ['kvk'],
    schema: null,
  },
  {
    id: 'eidas_oidc',
    label: 'eIDAS via OpenID Connect',
    providesAuth: ['bsn', 'pseudo'],
    schema: null,
  },
  {
    id: 'eidas_company_oidc',
    label: 'eIDAS for companies via OpenID Connect',
    providesAuth: ['pseudo'],
    schema: null,
  },
  {
    id: 'digid_machtigen_oidc',
    label: 'DigiD Machtigen via OpenID Connect',
    providesAuth: ['bsn'],
    schema: null,
  },
  {
    id: 'eherkenning_bewindvoering_oidc',
    label: 'eHerkenning bewindvoering via OpenID Connect',
    providesAuth: ['bsn'],
    schema: null,
  },
  {
    id: 'org-oidc',
    label: 'Organization via OpenID Connect',
    providesAuth: ['employee_id'],
    schema: {
      type: 'object',
      properties: {
        visible: {
          type: 'boolean',
          title: 'visible',
          description: 'Is the plugin always visible in the start of the form',
        },
      },
    },
  },
  {
    id: 'yivi_oidc',
    label: 'Yivi via OpenID Connect',
    providesAuth: ['bsn', 'kvk', 'pseudo'],
    schema: {
      type: 'object',
      properties: {
        authenticationOptions: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['bsn', 'kvk', 'pseudo'],
            enumNames: ['BSN', 'KvK number', 'Pseudo ID'],
          },
          title: 'Authentication options',
          description:
            'Authentication options that can be used by end-users. If left empty, a pseudo value will be used as identifier.',
        },
        additionalAttributesGroups: {
          type: 'array',
          items: {
            type: 'string',
            pattern: '^[-a-zA-Z0-9_]+$',
            title: 'Additional attributes groups',
            description:
              'Additional attributes groups to use for authentication. The end-user can choose per group whether they provide these attributes or not.',
          },
          title: 'Additional attributes groups',
          description:
            'Additional attributes groups to use for authentication. The end-user can choose per group whether they provide these attributes or not.',
        },
        bsnLoa: {
          type: 'string',
          enum: [
            '',
            'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
            'urn:oasis:names:tc:SAML:2.0:ac:classes:MobileTwoFactorContract',
            'urn:oasis:names:tc:SAML:2.0:ac:classes:Smartcard',
            'urn:oasis:names:tc:SAML:2.0:ac:classes:SmartcardPKI',
          ],
          enumNames: ['', 'DigiD Basis', 'DigiD Midden', 'DigiD Substantieel', 'DigiD Hoog'],
          title: 'options bsn LoA',
          description: 'The minimal LoA for bsn authentication.',
        },
        kvkLoa: {
          type: 'string',
          enum: [
            '',
            'urn:etoegang:core:assurance-class:loa1',
            'urn:etoegang:core:assurance-class:loa2',
            'urn:etoegang:core:assurance-class:loa2plus',
            'urn:etoegang:core:assurance-class:loa3',
            'urn:etoegang:core:assurance-class:loa4',
          ],
          enumNames: ['', 'Non existent (1)', 'Low (2)', 'Low (2+)', 'Substantial (3)', 'High (4)'],
          title: 'options kvk LoA',
          description: 'The minimal LoA for kvk authentication.',
        },
      },
    },
  },
];

export const mockAuthenticationPluginsGet = (spy?: Mock) =>
  http.get(
    `${BASE_URL}v2/authentication/plugins`,
    info => {
      // Call the spy with the request info
      if (spy) spy(info);

      return HttpResponse.json(DEFAULT_AUTHENTICATION_PLUGINS, {
        headers: {
          [SESSION_EXPIRES_IN_HEADER]: `3600`, // Set the session expiry to 1 hour
        },
        status: 200,
      });
    },
    {once: false}
  );
