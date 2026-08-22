import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import {
    findSupportedChatModel,
    type SupportedChatModel,
    type SupportedChatModelId,
    type SupportedProvider
} from "@nightcode/shared";
import type { LanguageModel } from 'ai';

type AnthropicModelId = Extract<SupportedChatModel, { provider: 'anthropic' }>['id'];
type OpenAIModelId = Extract<SupportedChatModel, { provider: 'openai' }>['id'];

export type ResolvedModel = {
    provider: SupportedProvider;
    modelId: SupportedChatModelId;
    model: LanguageModel;
};

function assertUnsupportedProvider(provider: never): never {
    throw new Error(`Unsupported provider: ${provider}`);
}

function resolveAnthropicModel(modelId: AnthropicModelId): ResolvedModel {
    return {
        model: anthropic(modelId),
        provider: 'anthropic',
        modelId
    };
}

function resolveOpenAIModel(modelId: OpenAIModelId): ResolvedModel {
    return {
        model: openai(modelId),
        provider: 'openai',
        modelId
    };
}

function resolveSupportedChatModel(model: SupportedChatModel): ResolvedModel {
    const provider = model.provider;
    switch (provider) {
        case 'anthropic':
            return resolveAnthropicModel(model.id as AnthropicModelId);
        case 'openai':
            return resolveOpenAIModel(model.id as OpenAIModelId);
        default:
            return assertUnsupportedProvider(provider);
    }
}

export function isSupportedChatModel(modelId: string): modelId is SupportedChatModelId {
    return findSupportedChatModel(modelId) !== null;
}

export function resolveChatModel(modelId: string): ResolvedModel {
    const model = findSupportedChatModel(modelId);
    if (!model) {
        throw new Error(`Unsupported model ID: ${modelId}`);
    }
    return resolveSupportedChatModel(model);
}